class Api::TaggingsController < ApplicationController
  def index
    @tags = Tagging.all
    render :index
  end

  def create
    @tag = Tagging.new(tag_params)

    if @tag.save
      render :show
    else
      flash[:errors] = @tag.errors.full_messages
    end
  end

  def destroy
    @tag = Tagging.find(params[:tagging][:id])

    if @tag.delete
      render :show
    else
      render json: @tag.errors.full_messages
    end
  end

  private
  def tag_params
    params.require(:tagging).permit(:spot_id, :tag)
  end
end
