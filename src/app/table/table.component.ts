import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

	public data: Object;
	public temp_var: Object=false;
	constructor(private http: HttpClient) {}

	pager: any = {};	
    pagedItems: any[];
	pageSize: number;
	
	public searchText : string;
	
	
	ngOnInit(): void { 
		this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe((res: Response) => {
			this.data=res;
			this.temp_var=true;
			this.pageSize=10;
			this.setPage(1, this.pageSize);
		});
	}
	
	
	setPage(page: number, pageSize: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.getPager(Object.keys(this.data).length, page, pageSize);
        this.pagedItems = Object.entries(this.data).slice(this.pager.startIndex, this.pager.endIndex + 1).map(entry => entry[1]);
    }
	
	
	getPager(totalItems: number, currentPage: number = 1, pageSize: number) {
	
        let totalPages = Math.ceil(totalItems / pageSize);

        if (currentPage < 1) { 
            currentPage = 1; 
        } else if (currentPage > totalPages) { 
            currentPage = totalPages; 
        }
        
        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
	
	
	onChangeEvent(ev) {
		this.pageSize=parseInt(ev.target.value);
		this.setPage(1, this.pageSize);
	}

	
	
}
