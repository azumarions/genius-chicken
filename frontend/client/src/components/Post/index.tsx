import React, {
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import Image from 'next/image'
// import PostDialog from '../PostDialog';
import { TASK } from '../../types'
import { Avatar, Box, Grid } from '@mui/material'
import { Dialog, DialogProps, DialogContent, DialogTitle } from '@mui/material'
import { ImageListItem, ImageListItemBar, IconButton } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import DeleteIcon from '@mui/icons-material/Delete'
// import { ProfileContext } from '../../contexts/profile';

type PostType = {
  post: TASK
}

const Post: React.FC<PostType> = ({ post }) => {
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper')

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const descriptionElementRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  return (
    <>
      <Grid item xs={12} sm={4} md={4} lg={4}>
        {/* <ImageListItem key={post.id}>
          <img
            src={`${post.img}?w=248&fit=crop&auto=format`}
            srcSet={`${post.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={post.title}
            loading="lazy"
            onClick={handleClickOpen('paper')}
          />
          <ImageListItemBar
            title={<Box sx={{ fontSize: { xs: 12, sm: 16, md: 16, lg: 18 }, }}>{post.title}</Box>}
            subtitle={<Box sx={{ fontSize: { xs: 10, sm: 14, md: 14, lg: 16 }, }}>{post.description}</Box>}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${post.title}`}
              >
                 <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem> */}
        <Box>{post.title}</Box>
        <Box>{post.description}</Box>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          sx={{
            fontSize: { xs: 18, sm: 24, md: 26, lg: 28 },
            padding: 2,
            textAlign: 'center',
          }}
        >
          {post.title}
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            {/* <Image src={post.img} width={500} height={500} alt={post.title} /> */}
            <Box
              sx={{ fontSize: { xs: 16, sm: 24, md: 26, lg: 28 }, padding: 2 }}
            >
              投稿詳細
            </Box>
            <Box sx={{ fontSize: { xs: 12, sm: 16, md: 16, lg: 18 } }}>
              {post.description}
            </Box>
          </Grid>
          {/* <PostDialog key={post.id} postId={post.id} userPost={post.userPost} /> */}
        </DialogContent>
      </Dialog>
    </>
  )
}
export default Post
