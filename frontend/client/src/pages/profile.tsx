import { Avatar, Box, Grid, IconButton } from '@mui/material'
import { NextPage } from 'next'
import Image from 'next/image'
import React, { useRef } from 'react'
import styles from '../styles/home.module.scss'
import { useIntersectionObserver } from '@/components/FadeIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'

const showElements = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add(styles.active)
    }
  })
}

const ProfilePage: NextPage = () => {
  const ref30 = useRef<HTMLHeadingElement>(null)
  const ref31 = useRef<HTMLHeadingElement>(null)
  const ref32 = useRef<HTMLHeadingElement>(null)
  const ref33 = useRef<HTMLHeadingElement>(null)
  const ref34 = useRef<HTMLHeadingElement>(null)
  const ref35 = useRef<HTMLHeadingElement>(null)
  const ref36 = useRef<HTMLHeadingElement>(null)
  const ref37 = useRef<HTMLHeadingElement>(null)
  const ref38 = useRef<HTMLHeadingElement>(null)
  const ref39 = useRef<HTMLHeadingElement>(null)

  useIntersectionObserver(
    [ref30, ref31, ref32, ref33, ref34, ref35, ref36, ref37, ref38, ref39],
    showElements
  )

  return (
    <>
      <Box>
        <Grid container sx={{ mt: { xs: 6, sm: 8, md: 8, lg: 8 } }}>
          <Grid container sx={{ position: 'fixed', zIndex: -1 }}>
            <Grid item xs={12} sm={6} md={5} lg={4}>
              <Box component="div" sx={{}}>
                <Image
                  src="/home6.png"
                  width={500}
                  height={700}
                  alt="home_image"
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={7} lg={8}></Grid>
          </Grid>
          <Grid container sx={{ mt: { xs: 40, sm: 42, md: 45, lg: 48 } }}>
            <Grid item xs={12} sm={6} md={5} lg={4}></Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={7}
              lg={8}
              sx={{
                mt: { xs: 1, sm: 2, md: 5, lg: 7 },
                bgcolor: 'rgba(176,151,097,0.8)',
              }}
            >
              <Box className={styles.heading} ref={ref30}>
                <Box
                  sx={{
                    textAlign: 'center',
                    fontFamily: 'serif',
                    fontSize: { xs: 18, sm: 22, md: 26, lg: 30 },
                  }}
                >
                  OVERVIEW
                </Box>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    m: { xs: 1, sm: 2, md: 3, lg: 5 },
                    ml: 2,
                    mr: 2,
                  }}
                >
                  このページでは開発者の情報をまとめています。
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={5} lg={4}></Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={7}
              lg={8}
              sx={{
                mt: { xs: 1, sm: 2, md: 5, lg: 7 },
                bgcolor: 'rgba(176,151,097,0.8)',
              }}
            >
              <Box className={styles.heading} ref={ref31}>
                <Box
                  sx={{
                    textAlign: 'center',
                    fontFamily: 'serif',
                    fontSize: { xs: 18, sm: 22, md: 26, lg: 30 },
                  }}
                >
                  SELF-INTRODUCTION
                </Box>
              </Box>
              <Box className={styles.heading} ref={ref32}>
                <Box
                  sx={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    sx={{ textAlign: 'center', m: 1, width: 130, height: 130 }}
                    src="/profile_image2.png"
                    alt="profile"
                  ></Avatar>
                </Box>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  名前：片桐東 年齢：２１歳 職業：大学生
                </Box>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  趣味：旅行、映画、酒
                </Box>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  プロクラミング歴：３年 好きな言語：typescript
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={5} lg={4}></Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={7}
              lg={8}
              sx={{
                mt: { xs: 1, sm: 2, md: 5, lg: 7 },
                bgcolor: 'rgba(176,151,097,0.8)',
              }}
            >
              <Box className={styles.heading} ref={ref33}>
                <Box
                  sx={{
                    textAlign: 'center',
                    fontFamily: 'serif',
                    fontSize: { xs: 18, sm: 22, md: 26, lg: 30 },
                  }}
                >
                  TECHNOLOGY
                </Box>
              </Box>
              <Box className={styles.heading} ref={ref34}>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  frontend: html, css, react, next.js, typescript
                </Box>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  backend: python, django, ruby, rails
                </Box>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  infrastructure: aws, docker, terraform
                </Box>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  others: nginx, linux, sql, github,
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={5} lg={4}></Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={7}
              lg={8}
              sx={{
                mt: { xs: 1, sm: 2, md: 5, lg: 7 },
                bgcolor: 'rgba(176,151,097,0.8)',
              }}
            >
              <Box className={styles.heading} ref={ref35}>
                <Box
                  sx={{
                    textAlign: 'center',
                    fontFamily: 'serif',
                    fontSize: { xs: 18, sm: 22, md: 26, lg: 30 },
                  }}
                >
                  SOCIAL MEDIA
                </Box>
              </Box>

              <Box className={styles.heading} ref={ref36}>
                <Grid container>
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <Box
                      sx={{
                        fontFamily: 'serif',
                        fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                        mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                        ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                        mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                      }}
                    >
                      github
                    </Box>
                    <Box
                      sx={{
                        fontFamily: 'serif',
                        fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                        mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                        ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                        mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                      }}
                    >
                      <IconButton href="https://github.com/azumarions/">
                        <GitHubIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <Box
                      sx={{
                        fontFamily: 'serif',
                        fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                        mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                        ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                        mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                      }}
                    >
                      instagram
                    </Box>
                    <Box
                      sx={{
                        fontFamily: 'serif',
                        fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                        mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                        ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                        mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                      }}
                    >
                      <IconButton href="https://www.instagram.com/azumarions/">
                        <InstagramIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <Box
                      sx={{
                        fontFamily: 'serif',
                        fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                        mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                        ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                        mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                      }}
                    >
                      twitter
                    </Box>
                    <Box
                      sx={{
                        fontFamily: 'serif',
                        fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                        mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                        ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                        mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                      }}
                    >
                      <IconButton href="https://twitter.com/azumarions/">
                        <TwitterIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                  {/* <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Box
                      sx={{
                        fontFamily: 'serif',
                        fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                        mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                        ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                        mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                      }}
                    >
                      wantedly
                    </Box>
                    <Box
                      sx={{
                        fontFamily: 'serif',
                        fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                        mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                        ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                        mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                      }}
                    >
                      <IconButton href="https://github.com/azumarions/">
                        <GitHubIcon />
                      </IconButton>
                    </Box>
                  </Grid> */}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default ProfilePage
