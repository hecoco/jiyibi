import clone from "@/lib/clone";
const localStorageKeyName = 'recodList';
const recordListModel = {
    data: [] as RecordItem[],
    fetch() {
        return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
    create(record: RecordItem) {
        const record2: RecordItem = clone(record);
        record2.createdAt = new Date(+new Date() + 8 * 3600 * 1000)
            .toJSON()
            .substr(0, 19)
            .replace("T", " ");
        this.data.push(record2);
        this.save();
    }
};

export default recordListModel;