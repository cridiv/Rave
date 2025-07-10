import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  console.log('Auth callback route called')
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  console.log('Auth code:', code)
  console.log('Full URL:', requestUrl.toString())
  
  if (code) {
    try {
      // Fix: Pass cookies directly without await
      const supabase = createRouteHandlerClient({ cookies })
      
      console.log('Attempting to exchange code for session')
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Error exchanging code:', error)
        return NextResponse.redirect(new URL('/signin?error=auth_error', requestUrl.origin))
      }
      
      console.log('Successfully exchanged code for session:', data)
      return NextResponse.redirect(new URL('/chat', requestUrl.origin))
      
    } catch (error) {
      console.error('Error in auth callback:', error)
      return NextResponse.redirect(new URL('/signin?error=auth_callback_failed', requestUrl.origin))
    }
  } else {
    console.log('No auth code found in URL')
    return NextResponse.redirect(new URL('/signin?error=no_code', requestUrl.origin))
  }
}
