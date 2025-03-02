import { faker } from '@faker-js/faker';


export function generateShippingDetails(overrides: Partial<ShippingDetails> = {}): ShippingDetails {
 
  const defaultDetails: ShippingDetails = {
    email: faker.internet.email({provider:'yopmail.com'}),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    company: faker.company.name(),
    street1: faker.location.streetAddress(),
    street2: faker.location.secondaryAddress(),
    street3: faker.location.secondaryAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.countryCode('alpha-2'),
    zip: faker.location.zipCode(),
    phone: faker.phone.number({style:'human'})
  };

  // Merge the default values with any provided overrides
  return { ...defaultDetails, ...overrides };
}

// Usage examples:
// Generate completely random shipping details
// const randomDetails = generateShippingDetails();

// Generate random shipping details but with specific email and state
// const partialDetails = generateShippingDetails({ 
//   email: 'test@example.com',
//   state: 'California'
// });