
module.exports.Message = {
    UserManagement: {
        SuccessMessage: {
            Create: "User created successfully !",
            Update: "User updated successfully !",
            Delete: "User deleted successfully !",
            Login: "Login successfull !",
            Fetch: "Users fetched !",
            Mail: "Email sent successfully !",
            OtpVerify: "Otp verified successfully !",
            Password:"Password updated successfully !"
        },
        FailureMessage: {
            Create: "User creation failed, kindly retry !",
            Update: "User updation failed, kindly retry !",
            Delete: "User deletion failed, kindly retry !",
            Login: "Login failed !",
            NotFound: "User not found !",
            OtpVerifyFailed: "Invalid Otp",
            PasswordFailed:"Password updation Failed !",
            Invalid:"Please enter valid username and password",
            Password: "Wrong Password, try again or click forget password to reset",
            ValidEmail: "Please enter valid email and password"
        }
    },
    UserRole: {
        SuccessMessage: {
            Create: "Role created successfully !",
            Update: "Role updated successfully !",
            Delete: "Role deleted successfully !",
            Login: "Login successfull !",
            Fetch: "Roles fetched !",

        },
        FailureMessage: {
            Create: "Role creation failed, kindly retry !",
            Update: "Role updation failed, kindly retry !",
            Delete: "Role deletion failed, kindly retry !",
            Login: "Login failed !",
            NotFound: "Roles not found !",
            InvalidId: "Invalid role id"
        }
    },
    Token: {
        SuccessMessage: {
            RevokeToken: "Token revoked",
        },
        FailureMessage: {
            RevokeToken: "Token revoke failed !",
            Config: "Token configuration error !",
            RefreshToken: "Refresh token generation failed !"
        }
    },



    Transaction: {
        SuccessMessage: {
            Success: "Transaction success !",
            Initiated: "Transaction initiated !",
            Fetch: "Transaction fetched !"
        },
        FailureMessage: {
            Failed: "Transaction failed !",
            InvAmount: "Invalid Amount",
            Initiation: "Transaction initiation failed !",
            NoTrx: "No transaction found"
        }
    },
    Common: {
        SuccessMessage: {
            Fetch(data = 'Data') { return `${data} fetched successfully !` },

            Creation(data = 'Data') { return `${data} created successfully !` },

            Send(data = 'Data') { return `${data} sent successfully !` },

            Updation(data = 'Data') { return `${data} updated successfully !` },
            Deletion(data = 'Data') { return `${data} updated successfully !` },
        },
        FailureMessage: {
            Fetch(data = 'Data') { return `${data} fetch failed, kindly retry !! ` },
            Send(data = 'Data') { return `${data} sent failed !` },

            Creation(data = 'Data') { return `${data} creation failed, kindly retry !!` },
            Updation(data = 'Data') { return `${data} updation failed, kindly retry !!` },
            Deletion(data = 'Data') { return `${data} deletion failed, kindly retry !!` },
            NotFound(data = 'Data') { return `No ${data}s found !!` },
            NoData: "No data found !",
            SomethingWnWrng: "Something went wrong we are trying to fix it. Please try again later !",
            TokenExpired: "Token expired !",
            InternalServerError: "Internal server error. Please try again later !",
            RowRefNotFound: "Reference not found please check and try again !",
            DataAlreadyExists: "Data already exists !",
            NoAccessToDelete: "No access to delete !",
            InvalidRef: "Invalid reference please check and try again !",
            NoAccess: "No access to this URL",

        }
    },


    
    Order: {
        SuccessMessage: {
            Create: "Order created successfully !",
            Update: "Order updated successfully !",
            Cancel: "Order cancelled successfully !",

            Delete: "Order deleted successfully !",
            Fetch: "Order fetched successfully !",
            Dispatch:"Order dispatched successfully !"
        },
        FailureMessage: {
            Create: "Order creation failed, kindly retry !",
            Update: "Order updation failed, kindly retry !",
            Delete: "Order deletion failed, kindly retry !",
            NotFound: "No orders found !",
            IdNotFound: "Order id is missing !",
            AlreadyExists: "Order already exists !",
        }
    },
   
    Dashboard: {
        SuccessMessage: {
            Fetch: "Dashboard fetched successfully !"
        },
        FailureMessage: {
            NotFound: "Dashboard not found !",
        }
    },
    
    Validation: {
        FailureMessage: {
            DataTypeError(data, type) { return `${data} must be ${type}` },
            Requied(data) { return `${data} is required` },
            Contain(data) { return `must contain a ${data}` },
            Password: "Password must be atleast 6-20 characters"
        }
    },
    SubscriptionManagement: {
        SuccessMessage: {
            Create: "Subscription plan created successfully !",
            Update: "Subscription plan updated successfully !",
            Delete: "Subscription plan deleted successfully !",
            Fetch: "Subscription plan fetched successfully !",
        },
        FailureMessage: {
            Create: "Subscription plan failed, kindly retry !",
            Update: "Subscription plan updation failed, kindly retry !",
            Delete: "Subscription plan deletion failed, kindly retry !",
            NotFound: "No Subscription plan found !"
        }
    },
    OrderManagement: {
        SuccessMessage: {
            Create: "Order created successfully !",
            Update: "Order updated successfully !",
            Delete: "Order deleted successfully !",
            Fetch: "Order fetched successfully !",
        },
        FailureMessage: {
            Create: "Order failed, kindly retry !",
            Update: "Order updation failed, kindly retry !",
            Delete: "Order deletion failed, kindly retry !",
            NotFound: "No Orders found !"
        }
    },
    TransactionManagement: {
        SuccessMessage: {
            Create: "Tranaction successful !",
            Update: "Tranaction updated successfully !",
            Delete: "Tranaction deleted successfully !",
            Fetch: "Tranaction fetched successfully !",
        },
        FailureMessage: {
            Create: "Tranaction failed, kindly retry !",
            Update: "Tranaction updation failed, kindly retry !",
            Delete: "Tranaction deletion failed, kindly retry !",
            NotFound: "No Tranaction found !"
        }
    },
}

