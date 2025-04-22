import {Key, SVGProps, useCallback, useState} from "react";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip,} from "@heroui/react";
import {Meme} from "../utils/types.ts";
import {useMemes} from "../store/MemeContext.tsx";
import {EditIcon} from "../assets/EditIcon.tsx";
import {useDisclosure} from "@heroui/react";
import {EditMemeModal} from "../components/EditMemeModal";
import { useMediaQuery } from 'react-responsive';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export const columns = [
    {name: "ID", uid: "id"},
    {name: "Name", uid: "name"},
    {name: "Image", uid: "image", hideOnMobile: true, hideOnTablet: false},
    {name: "Likes", uid: "likes"},
    {name: "Actions", uid: "actions"},
];

export default function TablePage() {
    const {memes, setMemes} = useMemes();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
    const isMobile = useMediaQuery({ maxWidth: 640 });
    const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
    const visibleColumns = columns.filter(col => {
        if (isMobile && col.hideOnMobile) return false;
        return !(isTablet && col.hideOnTablet);
    });


    const handleEdit = (meme: Meme) => {
        setSelectedMeme(meme);
        onOpen();
    };

    const handleSave = (updatedMeme: Meme) => {
        const updatedMemes = memes.map(m => m.id === updatedMeme.id ? updatedMeme : m);
        setMemes(updatedMemes);
    };

    const renderCell = useCallback((meme: Meme, columnKey: Key) => {
        const cellValue = meme[columnKey as keyof Meme];
        switch (columnKey) {
            case "id":
                return (
                    <div>
                        {cellValue}
                    </div>
                );
            case "image":
                return (
                    <div>
                        <p className="text-bold text-sm capitalize break-all">{cellValue}</p>
                    </div>
                );
            case "likes":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize "></p>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex justify-center items-center gap-2">
                        <Tooltip content="Edit meme">
                              <span
                                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                  onClick={() => handleEdit(meme)}
                              >
                                <EditIcon/>
                              </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <div>
                <Table aria-label="Table of memes">
                    <TableHeader columns={visibleColumns}>
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                style={{ width: isMobile ? "80px" : isTablet ? "120px" : "160px" }}
                                align={column.uid === "actions" ? "center" : "start"}
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={memes}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {visibleColumns.map((column) => (
                                    <TableCell key={column.uid} className="flex-none w-[100px] sm:w-[140px] md:w-[180px]">
                                        {renderCell(item, column.uid)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {selectedMeme && (
                <EditMemeModal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    meme={selectedMeme}
                    onSave={handleSave}
                />
            )}
        </>
    );
}
