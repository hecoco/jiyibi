type RecordItem = {
    tags: Tag[];
    formItem: string;
    type: string;
    amount: number;
    createdAt?: string;
};
type Tag = {
    id: string;
    name: string;
    svg:string;
    type:string;
};
type TagListModel = {
    data: Tag[];
    save: () => void;
    fetch: () => Tag[];
    create: (name: string) => 'success' | 'duplicated';
    remove: (id: string) => boolean;
    updateTagName: (id: string, name: string) => 'success' | 'duplicated' | 'not found';
};
interface Window {}