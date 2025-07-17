import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ToastController} from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { OrderService } from 'src/app/services/orders/order.service';

@Component({
  selector: 'app-attach-receipt',
  templateUrl: './attach-receipt.component.html',
  styleUrls: ['./attach-receipt.component.scss'],
})
export class AttachReceiptComponent implements OnInit {

  @ViewChild('fileinput') fileinput: any; 

  orderNumber: any;
  image: any;
  file_data:any='';
  imageName:any='';

  imageUrl = '';
  uploadedFile!: File;

  constructor(private modalCtrl: ModalController, private toast: ToastController,
    private loader: LoadingController, private orderService: OrderService) { }

  ngOnInit() {
   
  }
  
  selectedFile(event: any){
    const fileList: FileList = event.target.files;
    //check whether file is selected or not
    if (fileList.length > 0) {

        const file = fileList[0];
        //get file information such as name, size and type
        console.log('finfo',file.name,file.size,file.type);
        //max file size is 2 mb
        if((file.size/1048576)<2)
        {

          var reader = new FileReader();
          this.uploadedFile = event.target.files[0];
          reader.readAsDataURL(this.uploadedFile);
          reader.onload = (event: any) => {
            this.imageUrl = event.target.result;
          }

          let formData = new FormData();
          let info={id:2,name:'raja'};
          const rndInt = Math.floor(Math.random() * 100000000);
          this.imageName = rndInt+'-'+file.name;
          formData.append('file', file, this.imageName);
          formData.append('id','2');
          formData.append('tz',new Date().toISOString())
          formData.append('update','2')
          formData.append('info',JSON.stringify(info))
          this.file_data=formData
          
        }else{
          this.file_data ='';
          this.imageName ='';
          this.imageUrl = '';
          this.fileinput.nativeElement.value = '';
           alert('Image too large! Image size exceeds 2 MB. This iamge will not be uploaded')
        }

    }
  }

  async onClick(){
    const loading = await this.loader.create({
      message: 'Uploading ...'
    });
    await loading.present();
    this.orderService.uploadImageToFolder(this.file_data).subscribe(res =>{
      this.orderService.saveReciptToDb(this.orderNumber,this.imageName).subscribe((rese:any) =>{
        loading.dismiss();
        this.toast.create({
          message: rese.toString(),
          duration: 2000,
          position: 'top'
         }).then((toastData) =>{
          //console.log(toastData);
          toastData.present();
         })
         console.log(rese.toString())
         this.modalCtrl.dismiss(null, 'cancel');

      })
    }, (err) =>{
      loading.dismiss();
      this.toast.create({
        message: err.toString(),
        duration: 2000,
        position: 'top'
       }).then((toastData) =>{
        //console.log(toastData);
        toastData.present();
       })
       console.log(err)
       this.modalCtrl.dismiss(null, 'cancel');
    })   
 
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

 

}
