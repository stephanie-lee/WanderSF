Rails.application.routes.draw do
  root 'static_pages#root'

  resource :session, only: [:create, :destroy, :new]
  resources :users, only: [:create, :new, :show, :index]

  namespace :api, defaults: { format: :json } do
    resources :spots, only: [:index, :new, :create, :show] #do
      # resources :reviews, only: [:show]
    #end
    get 'spots/search', to: 'spots#search'
    resources :reviews, only: [:index, :create, :show, :update, :destroy]
    resources :taggings, only: [:index, :create, :show, :destroy]
    resources :tags, only: [:index, :create, :show]
  end
end
