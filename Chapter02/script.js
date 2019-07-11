new Vue({
    el: '#notebook',
    data() {
        return {
            notes: JSON.parse(localStorage.getItem('notes')) || [],
            selectedId: localStorage.getItem('selected-id') || null
        };
    },
    computed: {
        // Markdown render to HTML
        notePreview() {
            return this.selectedNote ? marked(this.selectedNote.content) : '';
        },
        addButtonTitle() {
            return this.notes.length + ' note(s) already';
        },
        selectedNote() {
            return this.notes.find(note => note.id === this.selectedId);
        }
    },
    watch: {
        // this don't work with some notes array modification
        // notes: 'saveNotes'

        notes: {
            // method
            handler: 'saveNotes',
            // We need this to watch each note's properties inside the array
            deep: true
        },
        selectedId(val) {
            localStorage.setItem('selected-id', val);
        }
    },
    methods: {
        addNote() {
            const time = Date.now();
            const note = {
                id: String(time),
                title: 'New note ' + (this.notes.length + 1),
                content:
                    '**Hi!** This notebook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting!',
                created: time,
                favorite: false
            };
            this.notes.push(note);
        },
        reportOperation(opName) {
            console.log('The', opName, 'operation was completed!');
        },
        selectNote(note) {
            this.selectedId = note.id;
        },
        saveNotes() {
            localStorage.setItem('notes', JSON.stringify(this.notes));
            console.log('Notes saved!', new Date());
        },
        removeNote() {
            if (this.selectedNote && confirm('Delete the note?')) {
                // remove note from array
                const idx = this.notes.indexOf(this.selectedNote);
                if (idx !== -1) {
                    this.notes.splice(idx, 1);
                }
            }
        },
        favoriteNote() {
            this.selectedNote.favorite = !this.selectedNote.favorite;
            // with XOR
            // this.selectedNote.favorite = this.selectedNote.favorite ^ true
            // this.selectedNote.favorite ^= true
        }
    },
    created() {}
});
