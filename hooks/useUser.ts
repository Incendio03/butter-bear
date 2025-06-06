'use client'

import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import type { User, AuthChangeEvent, Session } from "@supabase/supabase-js"

interface UserProfile {
    id: string
    email: string
    role: string
    status: string
    created_at: string
    updated_at: string
}

export function useUser() {
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: {user}} = await supabase.auth.getUser()
            setUser(user)

            if(user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single()
                
                    setProfile(profile)
            }
            setLoading(false)
        }

        getUser()

        const { data: {subscription} } = supabase.auth.onAuthStateChange(
            async (event: AuthChangeEvent, session: Session | null) => {
                setUser(session?.user ?? null)

                if(session?.user) {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', session.user.id)
                        .single()
                    
                        setProfile(profile)
                } else {
                    setProfile(null)
                }
                setLoading(false)
            }
        )

        return () => subscription.unsubscribe()
    }, [supabase])

    return { user, profile, loading}
}