import { Avatar, Button, Grid, Paper } from '@mui/material'
import { Box, display } from '@mui/system'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import { useIntersectionObserver } from '@/components/FadeIn'
import Typical from 'react-typical'
import styles from '../styles/home.module.scss'

const showElements = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // IntersectionObserver で設定された条件を満たした時に実行する処理
      // 要素に active クラスを適用する
      entry.target.classList.add(styles.active)
    }
  })
}

const HomePage: NextPage = () => {
  const ref1 = useRef<HTMLHeadingElement>(null)
  const ref2 = useRef<HTMLHeadingElement>(null)
  const ref3 = useRef<HTMLHeadingElement>(null)
  const ref4 = useRef<HTMLHeadingElement>(null)
  const ref5 = useRef<HTMLHeadingElement>(null)
  const ref6 = useRef<HTMLHeadingElement>(null)
  const ref7 = useRef<HTMLHeadingElement>(null)

  // カスタムフックを呼ぶ
  useIntersectionObserver([ref1, ref2, ref3, ref4, ref5, ref6, ref7], showElements)

  return (
    <>
    <Box>
    <Grid container sx={{ mt: {xs: 6, sm: 8, md: 8, lg: 8 }, bgcolor: "rgba(176,151,097,0.5)",}}>
      <Grid item xs={12} sm={12} md={4} sx={{ display: { xs: "none", sm: "none", md: "block", lg: "block"}}}>
        <Box component="div" sx={{}}>
          <Image src="/home5.png" width={300} height={500} layout="responsive" alt="home_image" />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ position: "relative" }}>
        <Box>
          <Image src="/home2.png" width={500} height={700} layout="responsive" alt="home_image" />
        </Box>
        <Box sx={{ ml: 2, fontFamily: "serif", fontSize: { xs: 16, sm: 18, md: 20, lg: 22} }}>
          <Typical
            steps={['Wellcome to My Portfolio!', 3000, 'Please enjoy the Genius Chicken.', 3000, 'Thank you for coming!', 3000]}
            loop={2}
            wrapper="p"
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ display: { xs: "none", sm: "block", md: "block", lg: "block"}}}>
        <Box component="div" sx={{}}>
          <Image src="/home6.png" width={300} height={500} layout="responsive" alt="home_image" />
        </Box>
      </Grid>
    </Grid>
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ mt: 2, textAlign: "center", fontFamily: "serif", fontSize: { xs: 16, sm: 18, md: 20, lg: 22}}}>
          タスク管理のための３機能
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} sx={{ mt: 1}}>
        <Box className={styles.heading} ref={ref1}>
          <Box sx={{ textAlign: "center", fontFamily: "serif", fontSize: { xs: 14, sm: 18, md: 20, lg: 22}}}>SORTING</Box>
          <Box sx={{ fontFamily: "serif", fontSize: { xs: 12, sm: 14, md: 16, lg: 18}, m: 1}}>
            タスク管理をより効率的にするためのソーティング機能。タスク順、進行度順、カテゴリー順、作成日順の４つを並び替えることが可能です。
          </Box>
          <Box sx={{ fontFamily: "serif", fontSize: { xs: 12, sm: 14, md: 16, lg: 18}, m: 1}}>
            タスクを昇順・降順で表示したり各分野ごとにタスクを分類することで管理しやすくなります。
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} sx={{ mt: 1}}>
        <Box className={styles.heading} ref={ref2}>
          <Box sx={{ textAlign: "center", fontFamily: "serif", fontSize: { xs: 14, sm: 18, md: 20, lg: 22}}}>PAGINATION</Box>
          <Box sx={{ fontFamily: "serif", fontSize: { xs: 12, sm: 14, md: 16, lg: 18}, m: 1}}>
            より良いUXを実現するためのページネーション機能。各ページにつき20項目を表示することが可能です。
          </Box>
          <Box sx={{ fontFamily: "serif", fontSize: { xs: 12, sm: 14, md: 16, lg: 18}, m: 1}}>
            １ページあたりの表示量を設定することでスクロールによる操作を少なくします。
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} sx={{ mt: 1}}>
        <Box className={styles.heading} ref={ref3}>
          <Box sx={{ textAlign: "center", fontFamily: "serif", fontSize: { xs: 14, sm: 18, md: 20, lg: 22}}}>SEARCHING</Box>
          <Box sx={{ fontFamily: "serif", fontSize: { xs: 12, sm: 14, md: 16, lg: 18}, m: 3}}>
            COMING SOON...
          </Box>
        </Box>
      </Grid>
    </Grid>
    <Grid container sx={{ mt: 3, mb: 2, position: "sticky", top: "30%", zIndex: -1}}>
      <Grid item xs={12} sm={2} md={3} lg={3}></Grid>
      <Grid item xs={12} sm={8} md={6} lg={6}>
        <Box>
          <Image src="/home11.png" width={100} height={100} layout="responsive" alt="home_image" />
        </Box>
      </Grid>
    </Grid>
    <Grid container sx={{ zIndex: 100}}>
    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ position: "relative", mb: { xs: 10, sm: 18, md: 20, lg: 23}}}>
        <Box sx={{ textAlign: "center", mt: 3, fontFamily: "serif", fontSize: { xs: 18, sm: 20, md: 24, lg: 30}, m: 1}}>
          複雑性を排除する
        </Box>
        <Box sx={{ textAlign: "center", mt: 1, fontFamily: "serif", fontSize: { xs: 16, sm: 18, md: 20, lg: 26}, m: 1}}>
          少し疲れているようですね…
        </Box>
        <Box sx={{ textAlign: "center", mt: 1, fontFamily: "serif", fontSize: { xs: 16, sm: 18, md: 20, lg: 26}, m: 1}}>
          多忙はトラブルの元です。
        </Box>
        <Box sx={{ textAlign: "center", mt: 1, fontFamily: "serif", fontSize: { xs: 16, sm: 18, md: 20, lg: 26}, m: 1}}>
          頭を整理しましょう。
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} sx={{ position: "relative", mb: { xs: 10, sm: 18, md: 20, lg: 23}}}>
        <Box sx={{ textAlign: "center", mt: 3, fontFamily: "serif", fontSize: { xs: 18, sm: 20, md: 24, lg: 30}, m: 1}}>
          忘れ物とは無縁に
        </Box>
        <Box sx={{ textAlign: "center", mt: 1, fontFamily: "serif", fontSize: { xs: 16, sm: 18, md: 20, lg: 26}, m: 1}}>
          3歩進んだらもう忘れていませんか？
        </Box>
        <Box sx={{ textAlign: "center", mt: 1, fontFamily: "serif", fontSize: { xs: 16, sm: 18, md: 20, lg: 26}, m: 1}}>
          賢いニワトリになりましょう。
        </Box>
        <Box sx={{ textAlign: "center", mt: 1, fontFamily: "serif", fontSize: { xs: 16, sm: 18, md: 20, lg: 26}, m: 1}}>
          メモや日記としてもおすすめです。
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} sx={{ position: "relative", mb: { xs: 30, sm: 41, md: 49, lg: 64}}}>
        <Box sx={{ textAlign: "center", mt: 3, fontFamily: "serif", fontSize: { xs: 18, sm: 20, md: 24, lg: 30}, m: 1}}>
          時間の最大有効化へ
        </Box>
        <Box sx={{ textAlign: "center", mt: 1, fontFamily: "serif", fontSize: { xs: 16, sm: 18, md: 20, lg: 26}, m: 1}}>
          考えていることを可視化しましょう。
        </Box>
        <Box sx={{ textAlign: "center", mt: 1, fontFamily: "serif", fontSize: { xs: 16, sm: 18, md: 20, lg: 26}, m: 1}}>
          行動はそれからです。
        </Box>
        <Box sx={{ textAlign: "center", mt: 1, fontFamily: "serif", fontSize: { xs: 16, sm: 18, md: 20, lg: 26}, m: 1}}>
          時間に変えはありません。
        </Box>
      </Grid>
    </Grid>
    </Box>
    <Box>
      <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Box className={styles.heading} ref={ref4}>
            <Box sx={{ textAlign: "center", fontFamily: "serif", fontSize: { xs: 16, sm: 18, md: 20, lg: 22}}}>ABOUT</Box>
            <Box sx={{ fontFamily: "serif", fontSize: { xs: 12, sm: 14, md: 16, lg: 18}, mt: 1}}>
              Genius Chickenはタスク管理のためのWebアプリです。
            </Box>
            <Box sx={{ fontFamily: "serif", fontSize: { xs: 12, sm: 14, md: 16, lg: 18}, mt: 1}}>
              SPA（シングルページアプリケーション）の特色を最大限に生かしたユーザー体験を提供します。
            </Box>
            <Box sx={{ fontFamily: "serif", fontSize: { xs: 12, sm: 14, md: 16, lg: 18}, mt: 1}}>
              Webアプリへの常識を覆してみませんか？
            </Box>
            <Box sx={{ fontFamily: "serif", fontSize: { xs: 12, sm: 14, md: 16, lg: 18}, mt: 1}}>
              詳細はこちらから↓
            </Box>
            <Box sx={{ textAlign: "center", mt: 1, fontFamily: "serif", fontSize: { xs: 16, sm: 18, md: 20, lg: 26}, m: 1,}}>
              <Button variant='contained' color='success' sx={{ pl: 10, pr: 10, fontFamily: "serif"}}>ABOUT</Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Box className={styles.heading} ref={ref5}>
            <Box sx={{ textAlign: "center", fontFamily: "serif", fontSize: { xs: 16, sm: 18, md: 20, lg: 22}}}>PROFILE</Box>
            <Box sx={{ textAlign: "center", display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
              <Avatar sx={{ textAlign: "center", m: 1, width: 150, height: 150 }} src="/home7.jpeg" alt="gest_login"></Avatar>
            </Box>
            <Box sx={{ fontSize: { xs: 12, sm: 14, md: 16, lg: 18}, m: 1}}>
              技術スタックや趣味、ライセンスなど
            </Box>
            <Box sx={{ textAlign: "center", mt: 1, fontFamily: "serif", fontSize: { xs: 16, sm: 18, md: 20, lg: 26}, m: 1,}}>
              <Button variant='contained' color='success' sx={{ pl: 10, pr: 10, fontFamily: "serif"}}>PROFILE</Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Box className={styles.heading} ref={ref6}>
            <Box sx={{ textAlign: "center", fontFamily: "serif", fontSize: { xs: 16, sm: 18, md: 20, lg: 22}}}>CONTACT</Box>
            <Box sx={{ fontSize: { xs: 12, sm: 14, md: 16, lg: 18}, m: 1}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ textAlign: "center", zIndex: 100, mt: 30}}>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ textAlign: "center", position: "relative", mb: { xs: 28, sm: 32, md: 36, lg: 40}}}>
          <Box className={styles.heading} ref={ref7}>
            <Box sx={{ textAlign: "center", mt: 3, fontFamily: "serif", fontSize: { xs: 18, sm: 20, md: 24, lg: 30}, m: 1}}>
              ゲストログイン
            </Box>
            <Box sx={{ textAlign: "center", mt: 1, fontFamily: "serif", fontSize: { xs: 16, sm: 18, md: 20, lg: 26}, m: 1}}>
              優れたユーザー体験をお試しください
            </Box>
            <Box sx={{ textAlign: "center", mt: 1, fontFamily: "serif", fontSize: { xs: 16, sm: 18, md: 20, lg: 26}, m: 1,}}>
              <Button variant='contained' color='success' sx={{ pl: 10, pr: 10, fontFamily: "serif"}}>LOGIN</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </>
  )
}

export default HomePage
