import { Map } from 'immutable';

const phoneContact = {
  name: 'phone',
  link: '+375293837184',
  to: 'tel:',
};

const whatsappContact = {
  name: 'whatsapp',
  link: '375293837184',
  to: 'https://api.whatsapp.com/send?phone=',
};

const skypeContact = {
  name: 'skype',
  link: 'peterbabukh',
  to: 'skype:',
};

const emailContact = {
  name: 'email',
  link: 'babukhpeter3@gmail.com',
  to: 'mailto:',
};

export const contactsMap = Map({
  phone: phoneContact,
  whatsapp: whatsappContact,
  skype: skypeContact,
  email: emailContact,
});
