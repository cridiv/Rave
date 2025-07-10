import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  console.log('Auth callback route called')
  console.log('Server timestamp:', Date.now())
  console.log('Server time:', new Date().toISOString())
  
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  console.log('Auth code:', code)
  console.log('Full URL:', requestUrl.toString())
  
  if (code) {
    try {
      // Await cookies() - crucial for newer Next.js versions
      const cookieStore = await cookies()
      
      // Create supabase client with clock skew tolerance
      const supabase = createRouteHandlerClient({ 
        cookies: () => cookieStore,
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        options: {
          auth: {
            detectSessionInUrl: true,
            flowType: 'pkce',
            autoRefreshToken: true,
            persistSession: true,
            debug: process.env.NODE_ENV === 'development'
          }
        }
      })
      
      console.log('Attempting to exchange code for session')
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Error exchanging code:', error)
        
        // Handle specific clock skew errors
        if (error.message?.includes('issued in the future') || 
            error.message?.includes('clock skew') ||
            error.message?.includes('Check the device clock')) {
          console.error('Clock skew detected, retrying in 2 seconds...')
          
          // Wait and try again
          await new Promise(resolve => setTimeout(resolve, 2000))
          
          const { data: retryData, error: retryError } = await supabase.auth.exchangeCodeForSession(code)
          
          if (retryError) {
            console.error('Retry failed:', retryError)
            return NextResponse.redirect(new URL('/signin?error=clock_skew_retry_failed', requestUrl.origin))
          }
          
          console.log('Retry successful:', retryData)
          return NextResponse.redirect(new URL('/chat', requestUrl.origin))
        } else {
          return NextResponse.redirect(new URL('/signin?error=auth_error', requestUrl.origin))
        }
      }
      
      console.log('Successfully exchanged code for session:', data)
      
      // Redirect to chat on success
      return NextResponse.redirect(new URL('/chat', requestUrl.origin))
      
    } catch (error) {
      console.error('Error in auth callback:', error)
      
      // Check if it's a clock skew related error
      if (error instanceof Error && 
          (error.message.includes('issued in the future') || 
           error.message.includes('clock skew') ||
           error.message.includes('Check the device clock'))) {
        console.error('Clock skew error caught in catch block')
        return NextResponse.redirect(new URL('/signin?error=clock_skew_error', requestUrl.origin))
      }
      
      return NextResponse.redirect(new URL('/signin?error=auth_error', requestUrl.origin))
    }
  } else {
    console.log('No auth code found in URL')
    return NextResponse.redirect(new URL('/signin?error=no_code', requestUrl.origin))
  }
}
