Rails.application.routes.draw do
  root 'users#index'

  resource :session, only: [:create, :destroy, :new]
  resources :users, only: [:create, :new, :show]

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
