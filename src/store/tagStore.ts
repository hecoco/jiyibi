import createId from "@/lib/createld";

const localStorageKeyName = 'tagsList';

const tagStore = {
    tagList : [] as Tag[],
    fetchTags(){
       this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.tagList
    },
    createTag (name: string)  {
        const id = createId().toString();
        const names = this.tagList.map(item => item.name);
        console.log(names);
        if (names.indexOf(name) >= 0) {
            window.alert("标签名重复");
            return 'duplicated';
        }
        this.tagList.push({ id: id, name: name });
        this.saveTags();
        return 'success'
    },
    removeTag (id: string)  {
        let index = -1;
        for (let i = 0; i < this.tagList.length; i++) {
            if (this.tagList[i].id === id) {
                index = i;
                break;
            }
        }
        this.tagList.splice(index, 1);
        console.log(this.tagList);
        this.saveTags();
        return true;
    },
    updateTag(id: string, name: string){
        const idList = this.tagList.map(item => item.id);
        if (idList.indexOf(id) >= 0) {
            const nameList = this.tagList.map(item => item.name);
            if (nameList.indexOf(name) >= 0) {
                return 'duplicated';
            } else {
                this.tagList.filter(item => item.id === id)[0].name = name;
                this.saveTags();
                return 'success';
            }
        }
        return "not found";
    },
    saveTags(){
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
    }
};

tagStore.fetchTags();

export default tagStore;