import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input
} from "@heroui/react";
import { Meme } from "../utils/types";
import { useEffect, useState } from "react";

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
    meme: Meme;
    onSave: (updated: Meme) => void;
};

export const EditMemeModal = ({ isOpen, onOpenChange, meme, onSave }: Props) => {
    const [editedMeme, setEditedMeme] = useState<Meme>(meme);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        setEditedMeme(meme);
        setErrors({});
    }, [meme]);

    const handleChange = (field: keyof Meme, value: string | number) => {
        setEditedMeme({ ...editedMeme, [field]: value });
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (!editedMeme.name || editedMeme.name.length < 3 || editedMeme.name.length > 100) {
            newErrors.name = "Name must be between 3 and 100 characters.";
        }

        const urlRegex = /^https?:\/\/.*\.(jpg|jpeg|png)$/i;
        if (!editedMeme.image && !urlRegex.test(editedMeme.image)) {
            newErrors.image = "Enter a valid JPG URL (e.g., https://...jpeg).";
        }

        if (
            typeof editedMeme.likes !== "number" ||
            isNaN(editedMeme.likes) ||
            editedMeme.likes < 0 ||
            editedMeme.likes > 99
        ) {
            newErrors.likes = "Likes must be a number from 0 to 99.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validate()) {
            onSave(editedMeme);
            onOpenChange();
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader>Edit Meme</ModalHeader>
                        <ModalBody>
                            <Input
                                label="Title"
                                value={editedMeme.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                isInvalid={!!errors.name}
                                errorMessage={errors.name}
                            />
                            <Input
                                label="Image URL"
                                value={editedMeme.image}
                                onChange={(e) => handleChange("image", e.target.value)}
                                isInvalid={!!errors.image}
                                errorMessage={errors.image}
                            />
                            <Input
                                label="Likes"
                                type="number"
                                value={editedMeme.likes.toString()}
                                onChange={(e) => handleChange("likes", Number(e.target.value))}
                                isInvalid={!!errors.likes}
                                errorMessage={errors.likes}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onOpenChange}>
                                Cancel
                            </Button>
                            <Button color="primary" onPress={handleSave}>
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};