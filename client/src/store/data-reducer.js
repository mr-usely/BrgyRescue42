import * as actions from './dataActions';

export const initialState = {
    firstName: '',
    lastName: '',
    birthday: '',
    cpnumber: '',
    age: 0,
    address: '',
    allergy: '',
    personToContact: '',
    relation: '',
    contactNumber: '',
    pathology: '',
    medication: '',
    email: '',
    password: '',
    isLoading: false,
    brgys: [],
    series: [],
    userDialog: []
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_USER_DATA:
            return {
                ...state,
                // prevInfo: action.infoArr
                firstName: action.firstName,
                lastName: action.lastName,
                birthday: action.birthday,
                allergy: action.allergy,
                cpnumber: action.cpnumber,
                age: action.age,
                address: action.address,
                personToContact: action.personToContact,
                relation: action.relation,
                contactNumber: action.contactNumber,
                allergy: action.allergy,
                pathology: action.pathology,
                medication: action.medications,
                organDonor: action.organDonor,
                email: action.email,
                password: action.password
            };
        case actions.SEND_VALUES:
            return {
                ...state,
                vals: action.infoArr
            };
        case actions.LOAD_ALL_DATA:
            return {
                ...state,
                totalE: action.setE,
                totalU: action.setU,
                brgys: action.allBrgys,
                series: action.series
            };
        case actions.LOAD_USER_DATA:
            return {
                ...state,
                isLoading: action.loading,
                dataUser: action.userData
            };
        case actions.SET_USER_DATA_DIALOG:
            return {
                ...state,
                userDialog: action.rowData
            };
        default:
            return state;
    }
};

export default dataReducer;
