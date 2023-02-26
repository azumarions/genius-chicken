import Layout from '@/components/Layout'
import AuthContextProvider from '@/context/auth'
import CategoryContextProvider from '@/context/category'
import ClusterContextProvider from '@/context/cluster'
import GroupContextProvider from '@/context/group'
import { ProfileContextProvider } from '@/context/profile'
import TaskContextProvider from '@/context/task'
import { UserContextProvider } from '@/context/user'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ProfileContextProvider>
        <UserContextProvider>
          <TaskContextProvider>
            <GroupContextProvider>
              <CategoryContextProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </CategoryContextProvider>
            </GroupContextProvider>
          </TaskContextProvider>
        </UserContextProvider>
      </ProfileContextProvider>
    </AuthContextProvider>
  )
}

export default MyApp
