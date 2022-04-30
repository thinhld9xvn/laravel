export function checkFilteredSet() {
    return this.authorFilterSelected !== '-1' || 
                this.postModifiedFilterSelected !== '-1' || 
                    this.categoryFilterSelected !== '-1';
}