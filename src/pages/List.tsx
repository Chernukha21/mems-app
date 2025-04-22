import {useMemes} from "../store/MemeContext.tsx";
import ListItem from "../components/ListItem.tsx";

const ListPage = () => {
    const {memes} = useMemes();
    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-3 grid-cols-4 gap-3 p-4 overflow-x-auto">
            {memes.map(meme => (
                <ListItem meme={meme} key={meme.id}/>
            ))}
        </div>
    );
};

export default ListPage;