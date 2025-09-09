export namespace main {
	
	export class Todo {
	    id: number;
	    title: string;
	    done: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Todo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.done = source["done"];
	    }
	}

}

