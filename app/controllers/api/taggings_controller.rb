class Api::TaggingsController < ApplicationController
  def index
    @taggings = Tagging.all
    render :index
  end

  def create
    @tagging = Tagging.new(tagging_params)

    if @tagging.save
      render :show
    else
      flash[:errors] = @tagging.errors.full_messages
    end
  end

  def destroy
    @tagging = Tagging.find(params[:tagging][:id])

    if @tagging.delete
      render :show
    else
      render json: @tagging.errors.full_messages
    end
  end

  private
  def tagging_params
    params.require(:tagging).permit(:spot_id, :tag)
  end
end
