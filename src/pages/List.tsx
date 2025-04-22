import {useMemes} from "../store/MemeContext.tsx";
import ListItem from "../components/ListItem.tsx";

const ListPage = () => {
    const {memes} = useMemes();
    return (
        <div id="card" className="grid grid-cols-1 gap-4 p-4">
            {memes.map(meme => (
                <ListItem meme={meme} key={meme.id}/>
            ))}
        </div>
    );
};

export default ListPage;