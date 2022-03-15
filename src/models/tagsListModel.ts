const localStorageKeyName = 'tagsList';
type TagListModel = {
    data: string[];
    fetch: () => string[];
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
        if (this.data.indexOf(name) >= 0) { return 'duplicated'; }
        this.data.push(name);
        this.save();
        return 'success';
    }
};

export { tagsListModel };