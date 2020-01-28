import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import * as globals from "../../globals";

@Component({
  selector: 'app-image-selection',
  templateUrl: './image-selection.component.html',
  styleUrls: ['./image-selection.component.css']
})
export class ImageSelectionComponent implements OnInit {

  @Output() logoEmitter = new EventEmitter<any>();

  @Output() closeEmitter = new EventEmitter<any>();

  selected = null;

  constructor(    
    /**
     * the data injected by the root component
     */
    @Inject(MAT_DIALOG_DATA) public data: any,
    /**
     * the dialog parent
     */
    private dialogRef: MatDialogRef<ImageSelectionComponent>
  ) {

  }
  /**
   * the method returns the current selection value
   */
  get currentSelection(){
    if(this.selected == null){
      return this.data.logo;
    } else {
      return this.selected;
    }
  }
  /**
   * the method confirms the selection
   */
  confirm(){
    this.logoEmitter.emit(this.selected);
  }
  /**
   * the method emits the close event
   */
  close(){
    this.closeEmitter.emit();
  }
  /**
   * the method returns all images
   */
  get images(){
    return globals.images;
  }
  /**
   * the method sets the current image
   */
  setImage(image){
    this.selected = image;
  }
  /**
   * the method is called on component initalization
   */
  ngOnInit() {
  }

}
