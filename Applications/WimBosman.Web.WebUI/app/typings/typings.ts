declare module app.typings {

    interface AuditBase {
        createdAt: Date;
        lastModifiedAt: Date;
    }

    interface OrderAddressType {
        id: number;
        type: string;
    }

    interface Address extends AuditBase {
        id: number;
        backendId: string;
        att: string;
        company: string;
        street: string;
        houseNumber: string;
        houseNumberExt: string;
        postCode: string;
        city: string;
        country: string;
        addressType: string;
        customer: Customer;
    }

    interface Customer extends AuditBase {
        id: number;
        backendId: string;
        name: string;
        email: string;
        phoneNumber: string;
        addresses: Address[];
    }

    interface OrderRemark {
        id?: number;
        orderId?: number;
        text?: string;
        author?: string;
        createdAt?: Date;
    }

    interface PagingFilter {
        pageNumber?: number;
        pageSize?: number;
    }

    interface DayCount {
        date: string;
        count: number;
    }
}

declare class xChart {
    constructor(type, data, selector, opts?);
}