class Api::TaggingsController < ApplicationController
  def index
    @taggings = Tagging.all
    render :index
  end

  def create
    @tagging = Tagging.new_with_tag(tagging_params)

    if @tagging.save
      render :show
    else
      flash[:errors] = @tagging.errors.full_messages
    end
  end

  def destroy
    @tagging = Tagging.find(params[:id])

    if @tagging.delete
      render :show
    else
      render json: @tagging.errors.full_messages
    end
  end

  def show
    @tagging = Tagging.find(params[:id])
    render :show
  end

  private
  def tagging_params
    params.require(:tagging).permit(:spot_id, :name)
  end
end
