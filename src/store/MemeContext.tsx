import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {MEMES} from "../MEMES.ts";
import {Meme} from "../utils/types.ts";


type MemeContextType = {
    memes: Meme[];
    setMemes: (memes: Meme[]) => void;
};

const MemeContext = createContext<MemeContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "memes";



export const MemeProvider = ({ children }: { children: ReactNode }) => {
    const [memes, setMemesState] = useState<Meme[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
            setMemesState(JSON.parse(stored));
        } else {
            setMemesState(MEMES);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(MEMES));
        }
    }, []);

    const setMemes = (newMemes: Meme[]) => {
        setMemesState(newMemes);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newMemes));
    };

    return (
        <MemeContext.Provider value={{ memes, setMemes }}>
            {children}
        </MemeContext.Provider>
    );
};

export const useMemes = () => {
    const context = useContext(MemeContext);
    if (!context) throw new Error("useMemes must be used within MemeProvider");
    return context;
};
