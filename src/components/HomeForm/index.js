import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import post1 from './blog-post.1.md';


const useStyles = makeStyles((theme) => ({
    mainGrid: {
      marginTop: theme.spacing(3),
    },
  }));
  
  const sections = [
    { title: '', url: '#' },
    { title: 'Technology', url: '#' },
  
    { title: 'Design', url: '#' },
    { title: '', url: '#' },
  ];
  
  const mainFeaturedPost = {
    title: 'Title of a longer featured blog post',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imgText: 'main image description',
    linkText: 'Continue reading…',
  };
  
 
  
  const posts = [post1];
  
  
  
const Blog = () => {
    const classes = useStyles();
  
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="PUNTO DE VENTA" sections={sections} />
          <main>
            <MainFeaturedPost post={mainFeaturedPost} />
           
            
          </main>
        </Container>
        <Footer description="Something here to give the footer a purpose!" />
      </React.Fragment>
    );
  }

export default Blog;