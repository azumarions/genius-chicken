import { Box, Grid } from '@mui/material'
import { NextPage } from 'next'
import Image from 'next/image'
import React, { useRef } from 'react'
import styles from '../styles/home.module.scss'
import { useIntersectionObserver } from '@/components/FadeIn'

const showElements = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add(styles.active)
    }
  })
}

const AboutPage: NextPage = () => {
  const ref8 = useRef<HTMLHeadingElement>(null)
  const ref9 = useRef<HTMLHeadingElement>(null)
  const ref10 = useRef<HTMLHeadingElement>(null)
  const ref11 = useRef<HTMLHeadingElement>(null)
  const ref12 = useRef<HTMLHeadingElement>(null)
  const ref13 = useRef<HTMLHeadingElement>(null)
  const ref14 = useRef<HTMLHeadingElement>(null)
  const ref15 = useRef<HTMLHeadingElement>(null)
  const ref16 = useRef<HTMLHeadingElement>(null)
  const ref17 = useRef<HTMLHeadingElement>(null)
  const ref18 = useRef<HTMLHeadingElement>(null)
  const ref19 = useRef<HTMLHeadingElement>(null)
  const ref20 = useRef<HTMLHeadingElement>(null)
  const ref21 = useRef<HTMLHeadingElement>(null)
  const ref22 = useRef<HTMLHeadingElement>(null)
  const ref23 = useRef<HTMLHeadingElement>(null)

  useIntersectionObserver(
    [
      ref8,
      ref9,
      ref10,
      ref11,
      ref12,
      ref13,
      ref14,
      ref15,
      ref16,
      ref17,
      ref18,
      ref19,
      ref20,
      ref21,
      ref22,
      ref23,
    ],
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
                  src="/home5.png"
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
              <Box className={styles.heading} ref={ref8}>
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
                  このページではGenius
                  Chickenのコンセプトや技術的な趣旨、開発時の問題点等をまとめてみました。
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
              <Box className={styles.heading} ref={ref9}>
                <Box
                  sx={{
                    textAlign: 'center',
                    fontFamily: 'serif',
                    fontSize: { xs: 18, sm: 22, md: 26, lg: 30 },
                  }}
                >
                  CONSEPT
                </Box>
              </Box>
              <Box className={styles.heading} ref={ref17}>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  Genius Chickenとは？
                </Box>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 1, sm: 1, md: 2, lg: 2 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  タスク管理のためのWebアプリケーションです。
                  タスクを作成や更新、削除する以外にも認証や並び替え、ページネーションなどの機能もあります。
                </Box>
              </Box>
              <Box className={styles.heading} ref={ref10}>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  なぜタスク管理アプリを開発しようと思ったのか？
                </Box>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 1, sm: 1, md: 2, lg: 2 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  大学の授業グループワークやゼミでの課題を管理できるようにしたかったからです。
                </Box>
              </Box>
              <Box className={styles.heading} ref={ref18}>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  このアプリの用途は？
                </Box>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 1, sm: 1, md: 2, lg: 2 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  基本的にはタスク管理ですが、メモや日記としても使えると思います。
                </Box>
              </Box>
              <Box className={styles.heading} ref={ref11}>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  Genius Chickenの由来は？
                </Box>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 1, sm: 1, md: 2, lg: 2 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  あまり開発とは関係ないですが、覚えることのできるニワトリは天才だとふと思ったからです。
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
              <Box className={styles.heading} ref={ref12}>
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
              <Box className={styles.heading} ref={ref13}>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  アプリ開発における技術選定とその動機は？
                </Box>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 1, sm: 1, md: 2, lg: 2 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  主にフロントエンドにはreact,nextjs,typescript,バックエンドにはpython,djangoのSPA構成にしました。コンテナにDocker、インフラはAWSを選択しました。
                </Box>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 1, sm: 1, md: 2, lg: 2 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  動機はいくつかあります。
                </Box>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 1, sm: 1, md: 2, lg: 2 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  1:リッチなUIを提供できるreactと汎用性が高くrailsに似ているdjangoとの組み合わせでアプリを作ってみたかったから。
                  （結局djangoではなくfast apiでも良かったなと思いました。）
                </Box>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 1, sm: 1, md: 2, lg: 2 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  2:これらの複数環境をコマンド1つで同時に立ち上げ、楽に管理するためにDockerを取り入れた。
                </Box>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 1, sm: 1, md: 2, lg: 2 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  3:Dockerを使うならデプロイ方法が自然と限られてくるので、その中でコスト的にも難易度的にも最適だと思ったECSのfargateタイプを選択した。
                </Box>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 1, sm: 1, md: 2, lg: 2 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  4:また、デプロイ時の人為的ミスをなくすためterraformを使用、今後の継続的な開発&デプロイのためgithub
                  actionsによるCI/CDパイプラインを導入した。
                </Box>
              </Box>
              <Box className={styles.heading} ref={ref14}>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  それぞれの1番工夫したところは？
                </Box>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 1, sm: 1, md: 2, lg: 2 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  フロントエンドでは、Reactの魅力を最大限に活用しようとしたところです。タスク画面を1ページで完結させたり、UIに動的な要素加えたり、データを状態管理しながらこねくり回したりなど。
                </Box>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 1, sm: 1, md: 2, lg: 2 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  バックエンドでは、完成したアプリには直接関係ないのですが、ユーザー情報のモデルをプロフィールとアカウントのモデルに分けたことです。将来アプリを拡大させる上で役に立つと思います。
                </Box>
              </Box>
              <Box className={styles.heading} ref={ref15}>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  開発する上で苦労したことは？
                </Box>
                <Box
                  sx={{
                    fontFamily: 'serif',
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                    mt: { xs: 1, sm: 1, md: 2, lg: 2 },
                    ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                    mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                  }}
                >
                  インフラ周りで苦労することが多かったです。Dockerでnext.jsを立ち上げるとnginxとの関係でホットリロードが効かなくなったり、ISRの際のエンドポイントでエラーが出たりなど。
                  あとは、データベースの修正やデザインの設計、状態管理の方法などです。
                </Box>
                <Box className={styles.heading} ref={ref16}>
                  <Box
                    sx={{
                      fontFamily: 'serif',
                      fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                      mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                      ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                      mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                    }}
                  >
                    Genius Chickenの今後について
                  </Box>
                  <Box
                    sx={{
                      fontFamily: 'serif',
                      fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                      mt: { xs: 1, sm: 1, md: 2, lg: 2 },
                      ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                      mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                    }}
                  >
                    まずは検索機能を実装しようと思います。本当は実装してからデプロイする予定だったのですが、途中で修正するところが多くなることに気が付き後回しにしました。
                  </Box>
                  <Box
                    sx={{
                      fontFamily: 'serif',
                      fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                      mt: { xs: 1, sm: 1, md: 2, lg: 2 },
                      ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                      mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                    }}
                  >
                    次に、複数人でタスクを管理できるようにしてみたら面白いし、実用性が上がるのではないかと考えているので、やってみたいです。
                  </Box>
                </Box>
                <Box className={styles.heading} ref={ref20}>
                  <Box
                    sx={{
                      fontFamily: 'serif',
                      fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                      mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                      ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                      mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                    }}
                  >
                    アプリ開発を通して後悔したことは？
                  </Box>
                  <Box
                    sx={{
                      fontFamily: 'serif',
                      fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                      mt: { xs: 1, sm: 1, md: 2, lg: 2 },
                      ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                      mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                    }}
                  >
                    開発期間の設定が少し甘かったことです。
                  </Box>
                  <Box
                    sx={{
                      fontFamily: 'serif',
                      fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                      mt: { xs: 1, sm: 1, md: 2, lg: 2 },
                      ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                      mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                    }}
                  >
                    特に今回は決めた時間内にアプリを作り切るということ重視していたので、間に合わなかったコードのリファクタリングやテスト、機能実装などがありました。
                  </Box>
                  <Box
                    sx={{
                      fontFamily: 'serif',
                      fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                      mt: { xs: 1, sm: 1, md: 2, lg: 2 },
                      ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                      mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                    }}
                  >
                    もう一つ、アプリ完成させてからデプロイというより、雛形が作れたらまず先にインフラ構築してデプロイをするべきだなと思いました。
                  </Box>
                  <Box
                    sx={{
                      fontFamily: 'serif',
                      fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                      mt: { xs: 1, sm: 1, md: 2, lg: 2 },
                      ml: { xs: 2, sm: 3, md: 4, lg: 5 },
                      mr: { xs: 2, sm: 3, md: 4, lg: 5 },
                    }}
                  >
                    流れとしては、環境構築→簡単なapi作成→フロントエンドで軽く処理→軽くテスト→インフラ構築→デプロイ→機能を追加していく、みたいな感じです。
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default AboutPage
