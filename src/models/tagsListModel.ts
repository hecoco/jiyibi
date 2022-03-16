import createId from "@/lib/createld";
const localStorageKeyName = 'tagsList';

const tagsListModel: TagListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.data;
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
    create(name) {
        const id = createId().toString();
        const names = this.data.map(item => item.name);
        if (names.indexOf(name) >= 0) { return 'duplicated'; }
        this.data.push({ id: id, name: name });
        this.save();
        return 'success';
    },
    remove(id: string) {
        let index = -1;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                index = i;
                break;
            }
        }
        this.data.splice(index, 1);
        this.save();
        return true;
    },
    updateTagName(id: string, name: string) {
        const idList = this.fetch().map(item => item.id);
        if (idList.indexOf(id)) {
            const nameList = this.fetch().map(item => item.name);
            if (nameList.indexOf(name) >= 0) {
                return 'duplicated';
            } else {
                const tag = this.fetch().filter(item => item.id === id)[0];
                tag.name = name;
                this.save();
                return 'success';
            }
        }
        return "not found";
    }
};

export default tagsListModel;