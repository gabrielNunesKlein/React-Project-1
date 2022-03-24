import './styles.css';
import { Component } from 'react';
import { loadPost } from '../../utils/load-post';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: ''
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

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value })
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  render(){
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length

    const filterdPosts = !!searchValue ? allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    }) 
    : posts;

    return (
      <section className="container">
      <div className="search-container">
        { !!searchValue && (
          <h1>Search Value: {searchValue}</h1>
        )}
        <TextInput searchValue={searchValue} handleChange={this.handleChange} />
      </div>

        {filterdPosts.length > 0 && (
          <Posts posts={filterdPosts} />
        )}

        {filterdPosts.length === 0 && (
          <p>Não existe posts</p>
        )}
        
        <div className='button-container'>
          { !searchValue && (
            <Button text="Load More post" onclick={this.loadMorePosts} disabled={noMorePosts} />
          )}
          
        </div>
        
      </section>
    )
  }
}


export default Home;