import { Injectable } from '@angular/core';
declare const iziToast: any;

@Injectable()
export class ToasterService {

  public iziToast: any;

  constructor() {
    this.iziToast = iziToast;
    this.iziToast.settings({
      position: 'topCenter',
      titleSize: '18'
    });
  }

  success(message: string): void {
    this.iziToast.success({
      title: message,
      class: 'sb-toaster sb-toast-success'
    });
  }

  info(message: string): void {
    this.iziToast.info({
      title: message,
      class: 'sb-toaster sb-toast-info'
    });
  }

  error(message: string): void {
    this.iziToast.error({
      title: message,
      class: 'sb-toaster sb-toast-error'
    });
  }

  warning(message: string): void {
    this.iziToast.warning({
      title: message,
      class: 'sb-toaster sb-toast-warning'
    });
  }

  custom(config: any): void {
    this.iziToast.show({
      class: config.class,
      message: config.message
    });
  }
}
