import './styles.css';
import { Component } from 'react';
import { loadPost } from '../../utils/load-post';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';

class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10
  };

  async componentDidMount() {
    await this.loadPosts()
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPost();

    this.setState({ posts: postsAndPhotos.slice(page, postsPerPage), allPosts: postsAndPhotos });
  }

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)

    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage})
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  render(){
    const { posts, page, postsPerPage, allPosts } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length

    return (
      <section className="container">
        <Posts posts={posts} />
        <div className='button-container'>
          <Button text="Load More post" onclick={this.loadMorePosts} disabled={noMorePosts} />
        </div>
        
      </section>
    )
  }
}


export default Home;