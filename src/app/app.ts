import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material/material-module';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from './dialog/dialog';
import { Api } from './services/api';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MaterialModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit,AfterViewInit{
  
constructor(private dialog: MatDialog,
  private api : Api
){}

displayedColumns: string[] = ['productName', 'category','date' ,'freshness', 'price','comment','action'];
dataSource !: MatTableDataSource<any>;

@ViewChild(MatPaginator) paginator !: MatPaginator;
@ViewChild(MatSort) sort !: MatSort;


//open product upload dialog 
 openDialog() {
     this.dialog.open(Dialog,{  
     }).afterClosed().subscribe(val=>{
      if(val==="Save"){
        this.getAllProducts();
      }
    })
  }

  ngOnInit(): void {
      
  }

  ngAfterViewInit(): void {
      this.getAllProducts();
       
  }

  //fetch all products from api
  getAllProducts(){
    this.api.getProduct()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error while fetching the data");
      }
        
    })
  }

  //sorting
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //edit product
  editProduct(row : any){
    this.dialog.open(Dialog,{
      data:row
    }).afterClosed().subscribe(val=>{
      if(val=="Update"){
        this.getAllProducts();
      }
    })
    
  }


  //delete product
  deleteProduct(id:number){
    this.api.deleteProduct(id)
    .subscribe({
      next:(res)=>{
        alert("Product Deleted Sucessfully")
        this.getAllProducts();
      },
      error:()=>{
        alert("Some error while deleting the product")
      }
    })
    
  }
}
