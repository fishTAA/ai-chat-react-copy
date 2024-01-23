import './searchContainer.css';
import { BsSearch } from "react-icons/bs";
import { articles } from './sampleArticles'
import { CategoriesContainer } from "./categoriesContainer";

export const SearchContainer = () => {
    return (
        <div className='main'>
            <div className="search">
                <div className="search-bar">
                    <div className="search-icon">
                        <BsSearch size={16}/>
                    </div>
                        <input className="search-text" placeholder='Search articles...'></input>
                    <div className='btn-search'>Search
                    </div>
                </div>
                <div className="most-search">Most searched results:</div>
                <div className='container'>
                    {articles.map(item => (
                    <div className="result-container" key={item.id}>
                        <div className="title">{item.title}</div>
                        <div className="content">{item.content}</div>
                        <div className='btn-view'>View article</div>
                    </div>
                    ))}
                </div>
            </div>
            <div className='category'>
                <CategoriesContainer/>
            </div>
        </div>
    )
}