json.extract!(@user, :id, :email, :first_name, :last_name, :wanderer_title)

if @user.picture
  json.picture @user.picture, :id, :name, :source
end
