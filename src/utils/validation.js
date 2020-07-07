export default {
   plateNumber: { required: { value: true, message: 'يجب ادخال رقم اللوحه' } },
   vehicleNumber: {
      required: { value: true, message: 'يجب ادخال رقم المعده' },
   },
   vehicleType: { required: { value: true, message: 'يجب اختيار نوع المعده' } },
   contractor: { required: { value: true, message: 'يجب اختيار رقم العقد' } },
   complainDescription: {
      required: { value: true, message: 'يجب ادخال وصف البلاغ' },
   },
   email: {
      required: { value: true, message: 'Email is required' },
      pattern: {
         value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         message: 'Invalid Email Format',
      },
   },
   password: {
      required: { value: true, message: 'Password is required' },
   },
};
