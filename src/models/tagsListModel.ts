const localStorageKeyName = 'tagsList';
type Tag = {
    id: string;
    name: string;
};
type TagListModel = {
    data: Tag[];
    fetch: () => Tag[];
    create: (name: string) => 'success' | 'duplicated';
    save: () => void;
};
const tagsListModel: TagListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.data;
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
    create(name: string) {
        const names = this.data.map(item => item.name);
        if (names.indexOf(name) >= 0) { return 'duplicated'; }
        this.data.push({ id: name, name: name });
        this.save();
        return 'success';
    }
};

export { tagsListModel };