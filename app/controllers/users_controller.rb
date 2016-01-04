class UsersController < ApplicationController
  before_action :require_logged_in!, only: [:index]
  before_action :require_logged_out!, only: [:new, :create]

  def index
  end

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(email: user_params[:email],
                     first_name: user_params[:first_name].capitalize,
                     last_name: user_params[:last_name].capitalize,
                     password: user_params[:password])

    if @user.save
      Picture.create( name: "User Picture",
                      source: Faker::Avatar.image(@user.email, "200x200", "png", "set1", "bg1"),
                      imageable_id: @user.id,
                      imageable_type: "User")
      login_user!(@user)
      redirect_to :root
    else
      flash[:errors] = @user.errors.full_messages
      redirect_to new_user_url
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :password)
  end
end
