Rails.application.routes.draw do
  root 'users#index'

  resource :session, only: [:create, :destroy, :new]
  resources :users, only: [:create, :new, :show, :index]

  namespace :api, defaults: { format: :json } do
    resources :spots
    resources :reviews
  end
end
