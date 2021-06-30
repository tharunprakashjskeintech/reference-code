
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


    VendingMachine: {
        SuccessMessage: {
            Create: "Vending machine created successfully !",
            Update: "Vending machine updated successfully !",
            Delete: "Vending machine deleted successfully !",
            Fetch: "Vending machines fetched successfully !"

        },
        FailureMessage: {
            Create: "Vending machine creation failed, kindly retry !",
            Update: "Vending machine updation failed, kindly retry !",
            Delete: "Vending machine deletion failed, kindly retry !",
            NotFound: "Vending machine not found !",
            AlreadyExists: "Vending machine already exists !",
        }
    },

    Workout: {
        SuccessMessage: {
            Create: "Workout created successfully !",
            Update: "Workout updated successfully !",
            Delete: "Workout deleted successfully !",
            Fetch: "Workout fetched successfully !"

        },
        FailureMessage: {
            Create: "Workout creation failed, kindly retry !",
            Update: "Workout updation failed, kindly retry !",
            Delete: "Workout deletion failed, kindly retry !",
            NotFound: "Workout videos not found !",
            IdNotFound: "Workout id is missing !",
            AlreadyExists: "Workout already exists !",
        }
    },

    Cart: {
        SuccessMessage: {
            Create: "Cart created successfully !",
            Update: "Cart updated successfully !",
            Delete: "Cart deleted successfully !",
            Fetch: "Cart fetched successfully !"

        },
        FailureMessage: {
            Create: "Cart creation failed, kindly retry !",
            Update: "Cart updation failed, kindly retry !",
            Delete: "Cart deletion failed, kindly retry !",
            NotFound: "Cart not found !",
            IdNotFound: "Cart id is missing !",
            AlreadyExists: "Cart already exists !",
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
    Commission: {
        SuccessMessage: {
            Create: "Commission intiated created successfully !",
            Update: "Commission process updated successfully !",
            Cancel: "Commission cancelled successfully !",

            Delete: "Commission deleted successfully !",
            Fetch: "Commission fetched successfully !"

        },
        FailureMessage: {
            Create: "Commission intiation failed, kindly retry !",
            Update: "Commission process updation failed, kindly retry !",
            Delete: "Commission deletion failed, kindly retry !",
            NotFound: "No Commission  found !",
            IdNotFound: "Commission id is missing !",
            AlreadyExists: "Commission request already exists !",
        }
    },
    WithdrawRequest: {
        SuccessMessage: {
            Create: "WithdrawRequest created successfully !",
            Update: "WithdrawRequest updated successfully !",
            Cancel: "WithdrawRequest cancelled successfully !",

            Delete: "WithdrawRequest deleted successfully !",
            Fetch: "WithdrawRequest fetched successfully !"

        },
        FailureMessage: {
            Create: "WithdrawRequest creation failed, kindly retry !",
            Update: "WithdrawRequest updation failed, kindly retry !",
            Delete: "WithdrawRequest deletion failed, kindly retry !",
            NotFound: "No WithdrawRequest found !",
            IdNotFound: "WithdrawRequest id is missing !",
            AlreadyExists: "WithdrawRequest already exists !",
        }
    },
    Coupon: {
        SuccessMessage: {
            Create: "Coupon created successfully !",
            Update: "Coupon updated successfully !",
            Delete: "Coupon deleted successfully !",
            Fetch: "Coupon fetched successfully !"

        },
        FailureMessage: {
            Create: "Coupon creation failed, kindly retry !",
            Update: "Coupon updation failed, kindly retry !",
            Delete: "Coupon deletion failed, kindly retry !",
            NotFound: "Coupon videos not found !",
            IdNotFound: "Coupon id is missing !",
            AlreadyExists: "Coupon already exists !",
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
    BankAccount: {
        SuccessMessage: {
            Create: "Bank account created successfully !",
            Update: "Bank account updated successfully !",
            Delete: "Bank account deleted successfully !",
            Fetch: "Bank account fetched successfully !"

        },
        FailureMessage: {
            Create: "Bank account creation failed, kindly retry !",
            Update: "Bank account updation failed, kindly retry !",
            Delete: "Bank account deletion failed, kindly retry !",
            NotFound: "Bank account videos not found !",
            IdNotFound: "Bank account id is missing !",
            AlreadyExists: "Bank account already exists !",
        }
    },


    Log: {
        SuccessMessage: {
            Create: "Logs created successfully !",
            Update: "Logs updated successfully !",
            Delete: "Logs deleted successfully !",
            Fetch: "Logs fetched successfully !"

        },
        FailureMessage: {
            Create: "Logs creation failed, kindly retry !",
            Update: "Logs updation failed, kindly retry !",
            Delete: "Logs deletion failed, kindly retry !",
            NotFound: "Logs not found !",
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
    ProductManagement: {
        SuccessMessage: {
            Create: "Product created successfully !",
            Update: "Product updated successfully !",
            Delete: "Product deleted successfully !",
            Fetch: "Product fetched successfully !",
            Disable: "Product disabled successfully !",
            Enable: "Product Enabled successfully !"

        },
        FailureMessage: {
            Create: "Product creation failed, kindly retry !",
            Update: "Product updation failed, kindly retry !",
            Delete: "Product deletion failed, kindly retry !",
            NotFound: "Product not found !",
            AlreadyExists: "Product already exists !",
            Disable: "Product disabled failed , kindly retry !",
            Enable: "Product Enabled failed , kindly retry !"

        }
    },
    RefillAgentManagement: {
        SuccessMessage: {
            Create: "Refill agent task created successfully !",
            Update: "Refill agent task updated successfully !",
            Delete: "Refill agent task deleted successfully !",
            Fetch: "Refill agent task fetched successfully !"

        },
        FailureMessage: {
            Create: "Refill agent task creation failed, kindly retry !",
            Update: "Refill agent task updation failed, kindly retry !",
            Delete: "Refill agent task deletion failed, kindly retry !",
            NotFound: "Refill agent task not found !",
            AlreadyExists: "Refill agent task already exists !",
        }
    },
    TechnicianManagement: {
        SuccessMessage: {
            Create: "Technician task created successfully !",
            Update: "Technician task updated successfully !",
            Delete: "Technician task deleted successfully !",
            Fetch: "Technician task fetched successfully !"

        },
        FailureMessage: {
            Create: "Technician creation failed, kindly retry !",
            Update: "Technician updation failed, kindly retry !",
            Delete: "Technician deletion failed, kindly retry !",
            NotFound: "Technician not found !",
            AlreadyExists: "Technician already exists !",
        }
    },
    HealthManagement: {
        SuccessMessage: {
            Create: "Health log task created successfully !",
            Update: "Health log task updated successfully !",
            Delete: "Health log task deleted successfully !",
            Fetch: "Health log task fetched successfully !"

        },
        FailureMessage: {
            Create: "Health log task creation failed, kindly retry !",
            Update: "Health log task updation failed, kindly retry !",
            Delete: "Health log task deletion failed, kindly retry !",
            NotFound: "Health log task not found !",
            AlreadyExists: "Health log task already exists !",
        }
    },
    RewardsManagement: {
        SuccessMessage: {
            Create: "Rewards created successfully !",
            Disable: "Rewards disabled successfully !",
            Fetch: "Technician task fetched successfully !",
        },
        FailureMessage: {
            Create: "Rewards creation failed, kindly retry !",
            Update: "Technician updation failed, kindly retry !",
            Delete: "Technician deletion failed, kindly retry !",
            Disable: "Rewards disabled failed, kindly retry !",

            NotFound: "Technician not found !",
            AlreadyExists: "Technician already exists !",
            Status:"Rewards already active, Disable rewards and add the rewards"
        }
    },
}

