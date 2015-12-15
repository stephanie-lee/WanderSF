class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :current_user_id, :logged_in?

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def current_user_id
    current_user ? current_user.id : nil
  end

  def logged_in?
    !!current_user
  end

  def login_user!(user)
    session[:session_token] = user.reset_session_token!
  end

  def logout_user!
    current_user.session_token = nil
    session[:session_token] = nil
  end

  def require_logged_in! ## use for writing reviews
    redirect_to new_session_url if current_user.nil?
  end

  def require_logged_out!
    redirect_to root_url if logged_in?
  end
end
