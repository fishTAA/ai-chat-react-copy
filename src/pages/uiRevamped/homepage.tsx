import { NavigationBar } from "./NavigationBar";
import { SearchContainer } from "./searchContainer";
import { CategoriesContainer } from "./categoriesContainer";


export const Homepage = () => {
    return (
        <div >
            <NavigationBar />
            <div className='contents'>
                <SearchContainer/>
                {/* <CategoriesContainer/> */}
            </div>
        </div>
    )
}