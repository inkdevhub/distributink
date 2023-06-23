#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod distributink {
    use crate::ensure;
    use ink::prelude::vec::Vec;

    #[derive(Debug, PartialEq, Eq, PartialOrd, Ord, Clone, scale::Encode, scale::Decode)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct DistributePair {
        recipient: AccountId,
        amount: Balance,
    }

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        NotOwner,
        BadDistributeBalance,
        Overflow,
    }

    pub type Result<T> = core::result::Result<T, Error>;

    #[ink(storage)]
    pub struct Distributink {
        price: Balance,
        owner: AccountId,
    }

    impl Distributink {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                price: 0,
                owner: Self::env().caller(),
            }
        }

        #[ink(message, payable)]
        pub fn distribute_equal(&mut self, list: Vec<AccountId>, amount: Balance) -> Result<()> {
            let user_count = list.len();
            let transfered_value = self.env().transferred_value();

            let expected_value = amount.checked_mul(user_count as u128).unwrap();

            ensure!(
                transfered_value == expected_value,
                Error::BadDistributeBalance
            );

            for recepient in list {
                if self.env().transfer(recepient, amount).is_err() {
                    panic!(
                        "requested transfer failed. this can be the case if the contract does not\
                         have sufficient free funds or if the transfer would have brought the\
                         contract's balance below minimum balance."
                    )
                }
            }
            Ok(())
        }

        #[ink(message)]
        pub fn set_price(&mut self, price: Balance) -> Result<()> {
            ensure!(self.env().caller() == self.owner, Error::NotOwner);
            self.price = price;
            Ok(())
        }

        #[ink(message)]
        pub fn get_price(&self) -> Balance {
            self.price
        }
    }

    #[cfg(test)]
    mod tests {
        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;

        #[ink::test]
        fn distributink_works() {
            let accounts = default_accounts();
            let mut distink = create_contract();
            let list = vec![accounts.bob, accounts.eve];

            assert_eq!(get_balance(accounts.bob), 1000);
            assert_eq!(get_balance(accounts.eve), 0);
            _ = ink::env::pay_with_call!(distink.distribute_equal(list.clone(), 10), 20);
            assert_eq!(get_balance(accounts.bob), 1010);
            assert_eq!(get_balance(accounts.eve), 10);

            assert_eq!(
                distink.distribute_equal(list, 20),
                Err(Error::BadDistributeBalance.into())
            );
        }

        fn set_sender(sender: AccountId) {
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(sender);
        }

        fn default_accounts() -> ink::env::test::DefaultAccounts<ink::env::DefaultEnvironment> {
            ink::env::test::default_accounts::<ink::env::DefaultEnvironment>()
        }

        fn get_balance(account_id: AccountId) -> Balance {
            ink::env::test::get_account_balance::<ink::env::DefaultEnvironment>(account_id)
                .expect("Cannot get account balance")
        }

        /// Creates a new instance of `Distributink`.
        ///
        /// Returns the `contract_instance`.
        fn create_contract() -> Distributink {
            let accounts = default_accounts();
            set_sender(accounts.alice);
            Distributink::new()
        }
    }
}

/// Evaluate `$x:expr` and if not true return `Err($y:expr)`.
///
/// Used as `ensure!(expression_to_ensure, expression_to_return_on_false)`.
#[macro_export]
macro_rules! ensure {
    ( $x:expr, $y:expr $(,)? ) => {{
        if !$x {
            return Err($y.into());
        }
    }};
}
