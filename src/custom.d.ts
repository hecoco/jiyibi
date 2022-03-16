type RecordItem = {
    tags: string[];
    formItem: string;
    type: string;
    amount: number;
    createdAt?: string;
};
type Tag = {
    id: string;
    name: string;
};
type TagListModel = {
    data: Tag[];
    save: () => void;
    fetch: () => Tag[];
    create: (name: string) => 'success' | 'duplicated';
    remove: (id: string) => boolean;
    updateTagName: (id: string, name: string) => 'success' | 'duplicated' | 'not found';
};
interface Window {
    store:{
        tagList: Tag[];
        createTag: (name: string) => void;
        removeTag: (id: string) => boolean;
        updateTagName: (id: string, name: string) => 'success' | 'duplicated' | 'not found';
        recordList: RecordItem[];
        createRecord:(record:RecordItem) =>void;
    }
}