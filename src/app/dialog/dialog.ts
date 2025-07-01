import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Api } from '../services/api';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog',
  imports: [MaterialModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss'
})
export class Dialog implements OnInit{

  freshnessList=['Brand New','Second Hand','Refurbished'];
  productForm !: FormGroup;
  actionBtn : string = "Save";

  constructor(private formBuilder : FormBuilder,
    private api : Api,
    private dialogRef : MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public editData :any
  ){}

  ngOnInit(): void {

    //initialize the form control
    this.productForm = this.formBuilder.group({
      productName : ['',Validators['required']],
      category : ['',Validators['required']],
      freshness : ['',Validators['required']],
      price : ['',Validators['required']],
      comment : ['',Validators['required']],
      date : ['',Validators['required']],
    })

    //when edit button clicked to regain the data
    if(this.editData){
      this.actionBtn = 'Update';
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }   
  }

  //add product to the api
  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next:(res)=>{
          alert('Product added sucessfully')
          this.productForm.reset();
          this.dialogRef.close('Save');
        },
        error:()=>{
          alert('Error while adding the product')
        }
      })
    }
    else{
      alert("Please fill all the data")
    }
    }
    else{
      this.updateProduct();
    }
  }

  //update the product
  updateProduct(){
      this.api.updateData(this.productForm.value,this.editData.id)
      .subscribe({
        next:(res)=>{
          alert('Product Updated sucessfully')
          this.productForm.reset();
          this.dialogRef.close('Update');
        },
        error:()=>{
          alert('Error while adding the product')
        }
      }) 
  }
}
