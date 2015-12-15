class SessionsController < ApplicationController
  before_action :require_logged_in!, only: [:destroy]
  before_action :require_logged_out!, only: [:new, :create]

  def new
    render :new
  end

  def create
    @user = User.find_by_credentials(
    params[:user][:email],
    params[:user][:password]
    )

    if @user
      login_user!(@user)
      redirect_to :root
    else
      flash[:errors] = ["Invalid username/password combination"]
      redirect_to new_session_url
    end
  end

  def destroy
    logout_user!
    render :new
  end
end
