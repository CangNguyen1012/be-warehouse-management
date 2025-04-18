import { Injectable } from '@nestjs/common';
import { PaymentMethodRepository } from './repository/payment-method.repository';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';

@Injectable()
export class PaymentMethodsService {
  constructor(private paymentMethodRepository: PaymentMethodRepository) {}

  async createPaymentMethod(createPaymentMethodDto: CreatePaymentMethodDto) {
    const newPaymentMethod = await this.paymentMethodRepository.create(
      createPaymentMethodDto,
    );
    return newPaymentMethod;
  }

  async findAllPaymentMethods(page: number = 1, limit: number) {
    const { total, results } = await this.paymentMethodRepository.findAll(
      page,
      limit,
    );
    return {
      statusCode: 200,
      data: { page, limit: total, total, results },
      timestamp: new Date().toISOString(),
    };
  }

  async findPaymentMethodById(id: string) {
    const paymentMethod = await this.paymentMethodRepository.findById(id);
    return paymentMethod;
  }

  async updatePaymentMethod(
    id: string,
    updatePaymentMethodDto: UpdatePaymentMethodDto,
  ) {
    const updatedPaymentMethod = await this.paymentMethodRepository.update(
      id,
      updatePaymentMethodDto,
    );
    return updatedPaymentMethod;
  }

  async deletePaymentMethod(id: string) {
    const deletedPaymentMethod = await this.paymentMethodRepository.delete(id);
    return deletedPaymentMethod;
  }
}
